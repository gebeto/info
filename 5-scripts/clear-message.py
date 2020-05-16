#! /usr/local/bin/python

"""
git filter-branch -f --msg-filter \
    'clear-message.py' \
    --tag-name-filter cat -- --all
"""

import sys
import re

pattern = r"TMS-\d{,2}:?\s[\W\w]+?:\s?"

if __name__ == "__main__":
    for line in sys.stdin:
        # line = re.sub(pattern, "", line)
        splitted = list(line)
        splitted[0] = splitted[0].upper()
        line = "".join(splitted)
        sys.stdout.write(line)
