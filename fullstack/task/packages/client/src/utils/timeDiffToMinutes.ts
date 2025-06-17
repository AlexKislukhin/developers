export const timeDiffToMinutes = (now: Date, compareTo: Date): string => {
    const diff = now.getTime() - compareTo.getTime();

    const minutesDiff = Math.floor(diff / 1000 / 60);

    if (minutesDiff <= 0) {
        return '< minute ago';
    }

    return `${minutesDiff} minutes ago`;
};
