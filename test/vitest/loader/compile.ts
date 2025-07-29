import type { LoadedCode } from "impasto/loader";
import { type Compiler } from "webpack";

export async function compile(compiler: Compiler | null): Promise<LoadedCode> {
  return new Promise((resolve, reject) => {
    if (!compiler) {
      reject(new Error("No compiler"));

      return;
    }

    compiler.run((error, stats) => {
      if (!stats) {
        reject(error);

        return;
      }

      if (stats.hasErrors()) {
        reject(
          new Error(stats.toJson().errors?.[0]?.message ?? "Unknown error"),
        );

        return;
      }

      const source = stats
        .toJson({ source: true })
        ?.modules?.[0]?.source?.toString();

      if (typeof source !== "string") {
        reject(new Error("No source found in stats"));

        return;
      }

      try {
        resolve(JSON.parse(source.slice(15, -1)));
      } catch (error) {
        reject(error);
      }
    });
  });
}
