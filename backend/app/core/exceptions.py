from fastapi import HTTPException, status

class IdempotencyConflictException(HTTPException):
    def __init__(self, detail: str = "A request with this sync_uuid is currently being processed. Please retry shortly."):
        super().__init__(status_code=status.HTTP_409_CONFLICT, detail=detail)

class SchemeNotFoundException(HTTPException):
    def __init__(self, scheme_code: str):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Scholarship scheme with code '{scheme_code}' does not exist or is inactive."
        )

class InvalidAadhaarException(HTTPException):
    def __init__(self, detail: str = "Invalid Aadhaar identification provided."):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)
