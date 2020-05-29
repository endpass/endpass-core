// @ts-check

/**
 * @returns {{
 *   timezone: string,
 *   gmt: number|string,
 * }}
 */
const getTimezone = () => {
  const dateParts = new Date().toString().split(' ');
  const timezoneType = dateParts[dateParts.length - 2];
  const timezoneOffset = dateParts[dateParts.length - 1];

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const gmt = `${timezoneType} ${timezoneOffset}`;

  return {
    timezone,
    gmt,
  };
};

export default getTimezone;
