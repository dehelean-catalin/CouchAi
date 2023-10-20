package com.example.couchai.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException exc) {
        ErrorResponse err = new ErrorResponse();
        err.setStatus(HttpStatus.NOT_FOUND.value());
        err.setMessage(exc.getMessage());
        err.setTimeStamp(System.currentTimeMillis());

        return ResponseEntity.status(HttpStatus.NOT_FOUND.value()).body(err);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleBadRequestExceptions(MethodArgumentNotValidException ex) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setStatus(400); // Bad Request
        errorResponse.setMessage("Validation error");
        errorResponse.setTimeStamp(System.currentTimeMillis());
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);

    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleOtherExceptions(Exception exc) {
        ErrorResponse err = new ErrorResponse();
        err.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        err.setMessage("An error occurred1: " + exc.getMessage());
        err.setTimeStamp(System.currentTimeMillis());

        return new ResponseEntity<ErrorResponse>(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
