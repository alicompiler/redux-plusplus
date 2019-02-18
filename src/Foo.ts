export default class Foo {
    public bar = (params: any): string => {
        return `${String(params)} => v2`;
    }
}