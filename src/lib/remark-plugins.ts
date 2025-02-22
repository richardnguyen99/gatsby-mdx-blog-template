import { type IMdxPluginOptions } from "gatsby-plugin-mdx/dist/plugin-options";
import remarkGfm from "remark-gfm";

const remarkPlugins = [
    remarkGfm,
] satisfies NonNullable<IMdxPluginOptions["mdxOptions"]>["remarkPlugins"];

export default remarkPlugins;
