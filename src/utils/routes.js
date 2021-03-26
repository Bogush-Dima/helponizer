import { Application } from "components/Application/Application";
import { Authorization } from "components/Authorization/Authorization";
import { AUTHORIZATION, HOME } from "constants/constants";

export const publicRoutes = [
  {
    path: AUTHORIZATION,
    component: Authorization
  }
]

export const privateRoutes = [
  {
    path: HOME,
    component: Application
  }
]