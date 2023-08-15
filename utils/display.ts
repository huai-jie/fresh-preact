export function pluralize(count: number, keyword: string, noCount?: boolean) {
  if (count === 1) {
    return !noCount ? `${count} ${keyword}` : keyword; // Singular form
  }

  const excludedKeywords = ["day", "minute", "hour"];
  if (excludedKeywords.includes(keyword)) {
    return !noCount ? `${count} ${keyword}s` : `${keyword}s`;
  }

  const irregularPlurals: { [key: string]: string } = {
    person: "people",
    // Add more irregular plurals as needed
  };

  if (Object.prototype.hasOwnProperty.call(irregularPlurals, keyword)) {
    const kw = irregularPlurals[keyword as keyof typeof irregularPlurals];
    return !noCount ? `${count} ${kw}` : kw;
  }

  const pluralizedKeyword = keyword.endsWith("y")
    ? keyword.slice(0, -1) + "ies"
    : ["s", "x", "z", "ch", "sh"].some((suffix) => keyword.endsWith(suffix))
    ? keyword + "es"
    : keyword + "s";

  return !noCount ? `${count} ${pluralizedKeyword}` : pluralizedKeyword;
}

/**
 * @todo Replace with https://deno.land/std@0.184.0/datetime/mod.ts?s=difference
 * @todo Tests
 */
export function timeAgo(time: number | Date | string) {
  const between = (Date.now() - Number(new Date(time).getTime())) / 1000;
  if (between < 3600) return `${pluralize(~~(between / 60), "minute")} ago`;
  else if (between < 86400) {
    return `${pluralize(~~(between / 3600), "hour")} ago`;
  } else return `${pluralize(~~(between / 86400), "day")} ago`;
}
