// src/app/api/auth/[...nextauth].js
import connectDB from '@/util/mongodbConnect';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import UserRegister from '@/modules/userregister';
import Googleprovider from 'next-auth/providers/google';

const authOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {},
            authorize: async (credentials) => {
                connectDB();
                const { email, password } = credentials;
                try {
                    const user = await UserRegister.findOne({ email });
                    if (!user) {
                        console.log('User not found');
                        return null;
                    }
                    const isValid = await bcrypt.compare(password, user.password);
                    if (isValid) {
                        console.log('User:', user);
                        return user;

                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error(error);
                    return null;
                }
            }
        }),
        Googleprovider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ account, profile }) {
            // console.log(profile, 'profile');
            try {
                const { email, name } = profile;
                await connectDB();
                const existingUser = await UserRegister.findOne({ email });
                if (existingUser) {
                    return existingUser;
                }
                const newUser = new UserRegister({
                    name: name,
                    email: email,
                    password: 'null',
                });
                await newUser.save();
                return {
                    ...newUser.toObject(),
                    id: newUser._id // Add MongoDB ID to the user object
                };
            } catch (error) {
                console.error(error);
                return error;
            }
        },

        jwt: async ({ token, user }) => {
            user && (token.user = user);
            return token;
        },
        session: async ({ session, token }) => {
            const userFromDB = await UserRegister.findOne({ email: session.user.email });
            if (userFromDB) {
                session.user = {
                    ...session.user,
                    _id: userFromDB._id.toString()
                };
            }
            return session;
        },


    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin',
    }

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }