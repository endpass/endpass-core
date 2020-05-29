// @ts-check

/**
 * @returns {{
 *   timezone: string,
 *   timezoneOffset: number,
 * }}
 */
const getTimezone = () => {
  const timezoneOffset = new Date().getTimezoneOffset();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return {
    timezone,
    timezoneOffset,
  };
};

export default getTimezone;
