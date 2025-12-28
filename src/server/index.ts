import {
    handleServerStreamingCall,
    handleUnaryCall,
    Server,
    ServerCredentials,
    UntypedHandleCall,
} from "@grpc/grpc-js";
import * as ProtoLoader from "@grpc/proto-loader";
import { ReflectionService } from "@grpc/reflection";
import {
    HelloServiceService,
    IHelloServiceServer,
} from "../generatedPb/proto/hello_grpc_pb";
import {
    SayHelloRequest,
    SayHelloResponse,
} from "../generatedPb/proto/hello_pb";

class ServerImpl implements IHelloServiceServer {
    [name: string]: UntypedHandleCall;
    sayHello: handleUnaryCall<SayHelloRequest, SayHelloResponse> = (
        call,
        callback
    ) => {
        const res = new SayHelloResponse();
        res.setResstring(
            `hoge Hello ${call.request.getReqarg()} ${call.request.getNum()}`
        );
        callback(null, res);
    };
    sayManyHello: handleServerStreamingCall<SayHelloRequest, SayHelloResponse> =
        async (call) => {
            for (let i = 0; i < 10; i++) {
                const res = new SayHelloResponse();
                res.setResstring(
                    `${
                        i + 1
                    }: ${call.request.getReqarg()} - ${call.request.getNum()}`
                );
                call.write(res);
                await new Promise((resolve, _) => {
                    setTimeout(() => resolve(1), 1 * 1000);
                });
            }
            call.end();
        };
}

function main() {
    const server = new Server();

    server.addService(HelloServiceService, new ServerImpl());

    const packageDefinition = ProtoLoader.loadSync("./proto/hello.proto");
    const reflection = new ReflectionService(packageDefinition);
    reflection.addToServer(server);

    server.bindAsync(
        "0.0.0.0:9000",
        ServerCredentials.createInsecure(),
        (error, port) => {
            if (error) {
                console.log(error);
                return;
            }

            console.log(`GRPC Server start at ${port}`);
        }
    );
}

main();
