/**
 * typeof SetTimeout.
 *
 * @example
 * ```typescript
 * const timerRef = useRef<SetTimeout>();
 *  timerRef.current = setTimeout(() => {
 *    func();
 *  }, 100);
 * clearTimeout(timerRef.current as SetTimeout);
 * ```
 */
type SetTimeOut = ReturnType<typeof setTimeout>;

export type {SetTimeOut};
