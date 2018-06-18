package com.example.akhil.amazonsucks;

/**
 * Created by akhil on 17-06-2018.
 */

import com.amazonaws.mobileconnectors.lambdainvoker.LambdaFunction;

public interface MyInterface {
    /**
     * Invoke lambda function "echo". The function name is the method name
     */
    @LambdaFunction
    String AndroidBackendLambdaFunction(NameInfo nameInfo);

    /**
     * Invoke lambda function "echo". The functionName in the annotation
     * overrides the default which is the method name
     */
    @LambdaFunction(functionName = "AndroidBackendLambdaFunction")
    void noEcho(NameInfo nameInfo);
}
