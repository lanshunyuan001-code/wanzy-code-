#!/usr/bin/env python3
"""
网站文件完整性监控脚本
- 首次运行生成 .integrity_baseline.json（基线哈希）
- 后续运行对比当前哈希与基线，不匹配则告警+自动恢复
- 用法: python3 scripts/file_integrity_monitor.py [--check]
"""

import os
import json
import hashlib
import sys
from datetime import datetime

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASELINE_FILE = os.path.join(PROJECT_ROOT, '.integrity_baseline.json')

# 只监控源代码和配置，不监控 node_modules/.next/build
WATCH_PATTERNS = [
    'app/',
    'components/',
    'lib/',
    'data/',
    'public/',
]

IGNORE_NAMES = {
    '.next', 'node_modules', '.git', '.integrity_baseline.json',
    'package-lock.json', '.DS_Store', 'Thumbs.db'
}


def compute_sha256(filepath: str) -> str:
    h = hashlib.sha256()
    with open(filepath, 'rb') as f:
        for chunk in iter(lambda: f.read(8192), b''):
            h.update(chunk)
    return h.hexdigest()


def scan_files(root: str) -> dict:
    """返回 {rel_path: sha256}"""
    result = {}
    for dirpath, dirnames, filenames in os.walk(root):
        # 跳过忽略的目录
        dirnames[:] = [d for d in dirnames if d not in IGNORE_NAMES]

        for filename in filenames:
            if filename in IGNORE_NAMES:
                continue
            full = os.path.join(dirpath, filename)
            rel = os.path.relpath(full, root)
            try:
                result[rel] = compute_sha256(full)
            except Exception:
                pass
    return result


def load_baseline() -> dict:
    if os.path.exists(BASELINE_FILE):
        with open(BASELINE_FILE) as f:
            return json.load(f)
    return {}


def save_baseline(data: dict):
    with open(BASELINE_FILE, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def main():
    action = sys.argv[1] if len(sys.argv) > 1 else '--init'
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    current = scan_files(project_root)

    if action == '--init':
        baseline = {
            'created_at': datetime.now().isoformat(),
            'files': current
        }
        save_baseline(baseline)
        print(f"✅ 基线已生成，共 {len(current)} 个文件")

    elif action == '--check':
        baseline = load_baseline()
        if not baseline or 'files' not in baseline:
            print("⚠️  无基线，请先运行 --init")
            sys.exit(1)

        old = baseline['files']
        new = current

        # 新增文件
        added = {k: v for k, v in new.items() if k not in old}
        # 被修改文件
        modified = {k: v for k, v in new.items() if k in old and old[k] != v}
        # 被删除文件
        deleted = {k: v for k, v in old.items() if k not in new}

        if not added and not modified and not deleted:
            print(f"✅ 完整性检查通过，共 {len(new)} 个文件无变化")
        else:
            if added:
                print(f"🚨 新增文件 ({len(added)}):")
                for k in added:
                    print(f"   + {k}")
            if modified:
                print(f"🚨 被篡改文件 ({len(modified)}):")
                for k in modified:
                    print(f"   ✗ {k}")
            if deleted:
                print(f"🚨 被删除文件 ({len(deleted)}):")
                for k in deleted:
                    print(f"   - {k}")

            # 恢复篡改文件（用 baseline 覆盖）
            if modified:
                for rel_path, sha256 in modified.items():
                    full = os.path.join(project_root, rel_path)
                    orig_content = None
                    try:
                        import base64
                        encoded = old[rel_path + ':b64']
                        orig_content = base64.b64decode(encoded)
                    except Exception:
                        pass
                    if orig_content:
                        with open(full, 'wb') as f:
                            f.write(orig_content)
                        print(f"♻️  已恢复: {rel_path}")
                    else:
                        print(f"⚠️  无法自动恢复 {rel_path}，请手动检查")

            print("\n📢 建议：立即检查以上文件，排查入侵来源")
            sys.exit(2)

    else:
        print("用法: python3 file_integrity_monitor.py [--init|--check]")


if __name__ == '__main__':
    main()
