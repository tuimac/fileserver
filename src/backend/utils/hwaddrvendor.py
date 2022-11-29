import requests
import traceback

class HwAddrVendor:
    @staticmethod
    def getVendorList() -> dict:
        # Initial variables
        url = 'https://gist.githubusercontent.com/aallan/b4bb86db86079509e6159810ae9bd3e4/raw/846ae1b646ab0f4d646af9115e47365f4118e5f6/mac-vendor.txt'
        database = dict()

        # Get the List from above url
        vendorList = requests.get(url)
        # Create Mac address vendor dictionary
        for line in vendorList.content.decode().splitlines():
            info = line.split('\t')
            database[info[0]] = info[1]
        return database

    @staticmethod
    def getVendor(macaddr: str) -> str:
        vendors = HwAddrVendor.getVendorList()
        try:
            return vendors[macaddr[0:8].replace(':', '').upper()]
        except KeyError:
            # If there is no vendor in the above list, search that by API.
            try:
                apiUrl = 'https://api.macvendors.com/' + macaddr.replace(':', '-')
                result = requests.get(apiUrl).content.decode()
                if 'error' in result:
                    return ''
                else:
                    return result
            except:
                logger.error(traceback.format_exc())
                return ''
        except:
            logger.error(traceback.format_exc())
            return ''
