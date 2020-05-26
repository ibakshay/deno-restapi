import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product } from "../types.ts";

let products: Product[] = [
  {
    id: "1",
    name: "Product one",
    description: "this is the description of product one",
    price: 555.99,
  },
  {
    id: "2",
    name: "Product two",
    description: "this is the description of product two",
    price: 25.99,
  },
  {
    id: "3",
    name: "Product three",
    description: "this is the description of product three",
    price: 64.99,
  },
  {
    id: "4",
    name: "Product four",
    description: "this is the description of product four",
    price: 23.99,
  },
];

//route GET /api/v1/products/:id
const getProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const product: Product | undefined = products.find((product) =>
    product.id === params.id
  );
  if (product) {
    response.status = 200;
    response.body = {
      data: product,
    };
  } else {
    response.status = 404;
    response.body = { success: false, message: "no product has been found" };
  }
};

const addProduct = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();
  if (!request.hasBody) {
    response.status = 404;
  } else {
    const product: Product = body.value;
    product.id = v4.generate();
    products.push(product);
    response.status = 201;
    response.body = { success: true };
  }
};

const updateProduct = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const product: Product | undefined = products.find((product) =>
    product.id === params.id
  );
  if (product) {
    const body = await request.body();
    const updateData = body.value;
    products = products.map((p) =>
      p.id === params.id ? { ...p, ...updateData } : p
    );
    response.status = 200;
  } else {
    response.status = 404;
    response.body = { success: false, message: "no product has been found" };
  }
};

const deleteProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  products = products.filter((product) => product.id !== params.id);
  response.body = { success: true, msg: "product removed" };
};

export { getProduct, addProduct, updateProduct, deleteProduct };
