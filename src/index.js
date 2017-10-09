import exitHook from 'async-exit-hook'

const callbacks = new Set()

const runExitCallbacks = () => {
    const promises = Array.from(callbacks).map(async (callback) => {
        return await callback()
    })
    return Promise.all(promises)
}

export const onExit = (callback) => callbacks.add(callback)

export const exit = async (code = 0) => {
    await runExitCallbacks()
    if (typeof code === 'function') {
        return code()
    }
    process.exit(code)
}

exitHook(exit)
