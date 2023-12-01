import {  testLink } from "./Link";
import {  testImage } from './Image';
import { CompositeDecorator } from "draft-js";


export const combinedDecorator = new CompositeDecorator([testLink,testImage]);
