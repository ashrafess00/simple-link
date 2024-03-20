'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";




export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function submitForm(e) {
        setLoading(true);
        e.preventDefault();
        if (email === "")
            return setEmailError("Can't be empty");
        if (password === "")
            return setPasswordError("Can't be empty");
        if (confirmPassword == "")
            return setConfirmPasswordError("can't be empty");
        if (password !== confirmPassword) {

            return setPasswordError("check again");
        }

        fetch("/api/register", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        .then(async res => {
            
            if (!res.ok)
            {
                const {message} = await res.json();
                if (message == 'Email already exists')
                    setPasswordError(message);
                else
                    setPasswordError("please check again");
                throw new Error("can't register");
            }
        })
        .then((data) => {
            router.push('login');
        })
        .catch(error => {
            setLoading(false);
        })
    }

    useEffect(() => {
        if (confirmPassword !== '' && confirmPassword !== password) {
            setConfirmPasswordError("Passwords don't match");
        } else {
            setConfirmPasswordError('');
        }
    }, [password, confirmPassword])


    return (
        <div className="md:grid grid-cols-1 place-items-center h-full pt-10 md:pt-0">
            
            <main className="md:p-10 rounded-lg max-w-screen-md w-full mx-auto">
                <header className="mx-auto max-w-xs w-3/4 mb-10">
                    <Image src="images/logo-devlinks-large.svg"
                        width={500}
                        height={500}
                        alt="logo"
                        className=""
                        />
                </header>
            
                <div className="p-10 md:bg-white w-full">
                    <h3 className="font-bold text-2xl mb-2">Create account</h3>
                    <p className="text-grey-1 mb-8">Let’s get you started sharing your links!</p>

                    <form className="w-full flex flex-col text-grey-1" onSubmit={submitForm}>
                        <label className='text-sm mb-2'>Email address</label>
                        <div className="w-full relative mb-8">
                            <input placeholder="e.g.alex@email.com"
                                type="text"
                                className={`input-email input w-full  ${emailError && "input-error"}`}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setEmailError("");
                                    setPasswordError("");
                                }}
                            />
                            {emailError
                            && <span className="text-sm font-thin text-red absolute right-4 inset-y-0 text-center flex items-center">{emailError}</span>}
                        </div>

                        <label className='text-sm mb-2'>Password</label>
                        <div className="w-full relative mb-8">
                            <input placeholder="Atleast .8 characters"
                                type="password"
                                className={`input-password input w-full  ${passwordError && "input-error"}`}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError("");
                                    setEmailError("");
                                }}
                            />
                            {passwordError
                            && <span className="text-sm font-thin text-red absolute right-4 inset-y-0 text-center flex items-center">{passwordError}</span>}
                        </div>

                        {/* confirm password */}
                        <label className='text-sm mb-2'>Confirm password</label>
                        <div className="w-full relative mb-8">
                            <input placeholder="At least .8 characters"
                                type="password"
                                className={`input-password input w-full  ${confirmPasswordError && "input-error"}`}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {confirmPasswordError
                            && <span className="text-sm font-thin text-red absolute right-4 inset-y-0 text-center flex items-center">{confirmPasswordError  }</span>}
                        </div>

                        <input type="submit"
                            value={loading ? "please wait ..." : "Create new account"}
                            className={`btn-primary my-6 ${loading && 'btn-disabled'}`}/>
                    </form>

                    <div className="md:flex justify-center gap-1">
                        <p className="text-center text-grey-1">Already have an account?</p>
                        <Link className="text-center  text-violet-1 hover:text-violet-2 transition duration-2 block" href="/login">Login</Link>
                    </div>
                </div>

            </main>
        </div>
    )
}