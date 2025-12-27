import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { HelloServiceClient as _HelloServiceClient, HelloServiceDefinition as _HelloServiceDefinition } from './HelloService';
import type { SayHelloRequest as _SayHelloRequest, SayHelloRequest__Output as _SayHelloRequest__Output } from './SayHelloRequest';
import type { SayHelloResponse as _SayHelloResponse, SayHelloResponse__Output as _SayHelloResponse__Output } from './SayHelloResponse';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  HelloService: SubtypeConstructor<typeof grpc.Client, _HelloServiceClient> & { service: _HelloServiceDefinition }
  SayHelloRequest: MessageTypeDefinition<_SayHelloRequest, _SayHelloRequest__Output>
  SayHelloResponse: MessageTypeDefinition<_SayHelloResponse, _SayHelloResponse__Output>
}

