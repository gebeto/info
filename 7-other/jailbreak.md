---
parent: Other
title: Jailbreak data
nav_order: 1
---

# Jailbreak data

UniqueChipID: 603460125392942

UniqueDeviceID: 00008020-000224D80269002E


- CPID: 8020
- CPRV: 11
- BDID: 0c
- ECID: 603460125392942
- CPFM: 03
- SCEP: 01
- IBFL: 3d
- SRNM: F71YJ977KXK6
- IMEI: N/A
- NONC: 8c9b1c0e45cebada167272b0f72c1254dbc9bc1ca30cfe3d02d1a58538ce4f01
- SNON: 5840ed619bc951613f60124698abe9a39bd09a81
- MODE: Recovery

## Data NONC XR
ECID iTunes: 224D80269002E
ECID: 603460125392942
MODEL: iPhone11,8
NONC: 8c9b1c0e45cebada167272b0f72c1254dbc9bc1ca30cfe3d02d1a58538ce4f01


## Fix iCloud Account
Jailbreak another (own) device, sign in to your icloud.

Go to:
/var/mobile/Library

ZIP folder: Accounts

Send Accounts.zip to the iCloud device

Unpack Accounts.zip and replae /var/mobile/Library/Accounts folder on icloud device


## Fix activation
Go to:
/var/root/Library/Lockdown/data_ark.plist

Add key-value:
com.apple.mobile⁩.lockdown_cache-ActivationState
FactoryActivated