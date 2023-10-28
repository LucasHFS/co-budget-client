import { GetServerSideProps, GetServerSidePropsContext } from "next"

export function withSSR(fn: GetServerSideProps) {
    return async (ctx: GetServerSidePropsContext) => {
        return await fn(ctx)
    }
}
