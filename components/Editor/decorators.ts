import {  testLink } from "./Entities/Link";
import {  testImage } from './Entities/Image';
import { CompositeDecorator } from "draft-js";
import { DividerDecorator } from "./Entities/Divider";




export const combinedDecorator = new CompositeDecorator([testLink,testImage,DividerDecorator]);
