import { createEntityAdapter } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter({});
const initialState = usersAdapter.getInitialState();
