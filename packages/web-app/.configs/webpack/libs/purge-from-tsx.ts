export class PurgeFromTsx {
  static extract(content: any) {
    // still misses TailwindCSS classes :(
    const classNames = content.match(/(?<=className=[\{\"\`]+)([^\"\`]+)/g) || [];
    const classes = classNames
      .map((el: any) => el.split(" "))
      .flat()
      .map((className: string) => className.replace("\n", ""))
      .filter(Boolean);
    const uniqueClasses = [...new Set(classes)];

    console.log("content", content);
    console.log("classes", classes);

    return uniqueClasses;
  }
}
