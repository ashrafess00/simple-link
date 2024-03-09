import Image from "next/image";
import Link from "next/link";


export default function page() {
    return (
        <div className="p-8">
            <header className="flex flex-row ">
                    <Image src="images/logo-devlinks-large.svg"
                        width={500}
                        height={500}
                        alt="logo"
                        className="w-1/2"
                        />
                    <div></div>
            </header>
            <main className="">
                <h3 className="">Create account</h3>
                <p>Let’s get you started sharing your links!</p>

                <form className="flex flex-col mt-20">
                    <label>Email address</label>
                    <input placeholder="e.g.alex@email.com"
                        type="text"
                        className="border-2 border-black p-4"
                        placeholder="e.g. alex@email.com"
                    />

                    <label>Create password</label>
                    <input type="password" 
                        placeholder="At least .8 characters"
                        className="border-2 border-black p-4"/>

                    <label>Confirm password</label>
                    <input type="password" 
                        placeholder="At least .8 characters"
                        className="border-2 border-black p-4"/>
                    <p>Password must contain at least 8 characters</p>

                    <input type="submit"
                        className="bg-green-300"
                        value={"Create new account"} />
                </form>

                <p>Already have an account?</p>
                <Link href="/login">Login</Link>
            </main>
        </div>
    )
}