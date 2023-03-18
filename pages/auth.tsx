import { Input } from "@/components";
import axios from "axios";
import { ChangeEvent, useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/router";

type variantType = "login" | "register";

const Auth = () => {
    const [email, setEmail] = useState("testing@fzelada.com");
    const [name, setName] = useState("TestingUser");
    const [password, setPassword] = useState("t3st1ng.&%");
    const router = useRouter();
    const [variant, setVariant] = useState<variantType>("login");
    const [loginError, setLoginError] = useState<string>("");
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) =>
            currentVariant === "login" ? "register" : "login"
        );
        setEmail("");
        setPassword("");
        setName("");
        setLoginError("");
    }, []);

    const login = useCallback(async () => {
        try {
            const response = await signIn("credentials", {
                email,
                password,
                redirect: false,
                // callbackUrl: "/profiles",
            });
            if (response?.ok) router.push("/profiles");
            else {
                setLoginError(response?.error!);
                setTimeout(() => {
                    setLoginError("");
                }, 5000);
            }
        } catch (error) {}
    }, [email, password, router]);

    const register = useCallback(async () => {
        try {
            await axios.post("/api/register", {
                email,
                name,
                password,
            });
            login();
        } catch (error) {
            console.log(error);
        }
    }, [email, name, password, login]);

    return (
        <div
            className="
            relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover
            "
        >
            {loginError && (
                <div className="fixed top-0 left-1/2  z-50 m-4 p-4 bg-red-500 text-white rounded-md transform -translate-x-1/2 text-center duration-500 ease-in-out">
                    {`${
                        variant === "login" ? "Sign in error" : "Register error"
                    }: ${loginError}`}
                </div>
            )}

            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <picture>
                        <img
                            src="/images/logo.png"
                            alt="logo"
                            className="h-12"
                        />
                    </picture>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant == "login" ? "Sign In" : "Register"}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant == "register" && (
                                <Input
                                    id={"name"}
                                    onChange={(
                                        ev: ChangeEvent<HTMLInputElement>
                                    ) => setName(ev.target.value)}
                                    value={name}
                                    label={"Name"}
                                />
                            )}
                            <Input
                                id={"email"}
                                onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                                    setEmail(ev.target.value)
                                }
                                value={email}
                                label={"Email"}
                                type="email"
                            />
                            <Input
                                id={"password"}
                                onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                                    setPassword(ev.target.value)
                                }
                                value={password}
                                label={"Password"}
                                type="password"
                            />
                        </div>
                        <button
                            onClick={variant === "login" ? login : register}
                            className="bg-red-500 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
                        >
                            {variant == "login" ? "Login" : "Register"}
                        </button>

                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div
                                onClick={() =>
                                    signIn("google", {
                                        callbackUrl: "/profiles",
                                    })
                                }
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                            >
                                <FcGoogle size={30} />
                            </div>
                            <div
                                onClick={() =>
                                    signIn("github", {
                                        callbackUrl: "/profiles",
                                    })
                                }
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                            >
                                <FaGithub size={30} />
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {variant == "login"
                                ? "First time using Netflix?"
                                : "Already have an account"}
                            <span
                                onClick={toggleVariant}
                                className="text-white ml-1 hover:underline cursor-pointer"
                            >
                                {variant == "login"
                                    ? "Create an account"
                                    : "Login"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
