import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9]+$/, {
    message: "Username can only include letters and numbers. Please remove any special characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  name: z.string().regex(/^[a-zA-Z\s]+$/, {
    message: "Full name must contain only alphabetic characters and spaces",
  }),
  password: z.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{8,20}$/, {
    message: "Password must be 8-20 characters long and include at least one lowercase letter, one uppercase letter, one numeric digit, and one special character. It must not contain any spaces.",
  }),
});
type FormData = z.infer<typeof schema>;
 function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    
  };
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Signup</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
       <form onSubmit={handleSubmit(onSubmit)}>
       <div className="grid gap-4">
        <div className="flex gap-2 flex-col items-start">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Jhon doe"
              required
              {...register("name")}
            />
            {errors.name && <span className="text-[13px] text-red-500">{errors.name.message}</span>}
          </div>
          <div className="flex gap-2 flex-col items-start">
            <Label htmlFor="username">username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Jhondoe@123"
              required
              {...register("username")}
            />
            {errors.username && <span className="text-[13px] text-red-500">{errors.username.message}</span>}
          </div>
          <div className="flex gap-2 flex-col items-start">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              {...register("email")}
            />
            {errors.email && <span className="text-[13px] text-red-500">{errors.email.message}</span>}
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" required  {...register("password")}/>
            {errors.password && <span className="text-[13px] text-red-500">{errors.password.message}</span>}
          </div>
          <Button type="submit" className="w-full">
           Signup
          </Button>
          {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
        </div>
       </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?
          <Link to="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default SignupPage