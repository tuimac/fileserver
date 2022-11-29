class MacAddressFormatException(Exception):
    def __init__(self):
        super().__init__('The delimiter of macaddress should be ":" or "-".')
