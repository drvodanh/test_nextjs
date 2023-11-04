export async function fetchData(words: string): Promise<any>{

    const data ={
        words: words || ""
    }
    return new Promise((resolve, reject) => {
        return resolve(data)
    })
}