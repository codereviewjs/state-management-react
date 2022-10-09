import { Request, Response } from "express";
import { IAuth } from "../models/auth.model";

interface ReqProps {
  body?: Record<string, unknown>;
  params?: Record<string, string>;
}

interface ResProps {
  locals?: {
    auth?: IAuth | null;
  };
}

interface Props {
  req?: ReqProps;
  res?: ResProps;
}
export function expressRequestResponse(props: Props = {}) {
  const resJsonMockFn = jest.fn();
  const req = {
    ...props.req,
  } as Request;

  // @ts-expect-error
  const res = {
    ...props.res,
    json: resJsonMockFn,
  } as Response;

  return { req, res, next: jest.fn(), resJsonMockFn };
}
