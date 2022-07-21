// Copyright 2021 Twitter, Inc.
// SPDX-License-Identifier: Apache-2.0

import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { cleanEnv, str } from "https://deno.land/x/envalid@v0.0.3/mod.ts";
import { Client } from "../src/mod.ts";

const env = cleanEnv(Deno.env.toObject(), {
  BEARER_TOKEN: str(),
});

const client = new Client(env.BEARER_TOKEN);
const { data } = await client.users.findUserByUsername("TwitterDev");
if (!data) throw new Error("Couldn't find user");
let count = 0;
for await (const followers of client.users.usersIdFollowers(data.id)) {
  console.log(followers);
  if (++count == 3) {
    break;
  }
}
