package com.example.couchai.exception;

import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ErrorResponse {
    private int status;
    private String message;
    private long timeStamp;
}
