import os

start = [
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/Screenshot_1721767990.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/Screenshot_1721767994.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/Screenshot_1721768178.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/Screenshot_1721768248.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/Screenshot_1721768426.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/Screenshot_1721768429.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/Screenshot_1721768446.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/Screenshot_1721768455.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/Screenshot_1721768468.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/Screenshot_1721768478.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/Screenshot_1721769439.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/Screenshot_1721769448.png",
]

end = [
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/new/Screenshot_1721767990.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/new/Screenshot_1721767994.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/new/Screenshot_1721768178.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/new/Screenshot_1721768248.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/new/Screenshot_1721768426.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/new/Screenshot_1721768429.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/new/Screenshot_1721768446.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/new/Screenshot_1721768455.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/new/Screenshot_1721768468.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/new/Screenshot_1721768478.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/new/Screenshot_1721769439.png",
    "/home/heitzlki/Code/Inventory/PlayStoreRelease/Screenshots/new/Screenshot_1721769448.png",
]


for i in start:
    os.system(
        f"convert '{i}' -gravity North -chop 0x67 -gravity South -chop 0x67 '{i}'"
    )
