import { credentials } from "@grpc/grpc-js";
import { HelloServiceClient } from "../generatedPb/proto/hello_grpc_pb";
import {
    SayHelloRequest,
    SayHelloResponse,
} from "../generatedPb/proto/hello_pb";

async function main() {
    const client = new HelloServiceClient(
        "localhost:9000",
        credentials.createInsecure()
    );

    const request = new SayHelloRequest();
    request.setNum(999);
    request.setReqarg("Protoc gen!!");

    const response = await new Promise<SayHelloResponse>((resolve, reject) => {
        client.sayHello(request, (error, value) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            if (!value) {
                console.log("undefined");
                reject();
            } else {
                resolve(value);
            }
        });
    });

    console.log(`Client call response: ${response.getResstring()}`);

    console.log("Start Stream");

    await client.sayManyHello(request).forEach((data) => {
        const res: SayHelloResponse = data;
        console.log(`Streaming: ${res.getResstring()}`);
    });

    console.log("End Stream");
}

(async () => {
    await main();
})();
