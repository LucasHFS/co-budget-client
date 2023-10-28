import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { destroyCookie, parseCookies } from "nookies"
import { AuthTokenError } from "@/modules/infra/services/errors/AuthTokenError"

export function withSSRAuth(fn: GetServerSideProps) {
    return async (ctx: GetServerSidePropsContext) => {
        const cookies = parseCookies(ctx)
        if (!cookies['co-budget.token']) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false
                }
            }
        }
        try {
            return await fn(ctx)
        } catch (error) {
            if (error instanceof AuthTokenError) {
                console.log(error)
                destroyCookie(ctx, 'co-budget.token')

                return {
                    redirect: {
                        destination: '/login',
                        permanent: false
                    }
                }
            }
        }
    }
}
