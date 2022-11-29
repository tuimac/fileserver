class ReplyFormat:
    @staticmethod
    def status_200(result: dict) -> dict:
        return {
            'status_code': 200,
            'message': 'success',
            'result': result
        }

    @staticmethod
    def status_400(message: str) -> dict:
        return {
            'status_code': 400,
            'message': message
        }

    @staticmethod
    def status_500(message: str) -> dict:
        return {
            'status_code': 500,
            'message': message
        }
