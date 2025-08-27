import z from "zod";

export const signInSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(11, "Phone number must be at least 11 characters"),
  role: z.enum(["user", "agent"]).refine((val) => !!val, {
    message: "Role is required",
  }),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

export type SignInFormData = z.infer<typeof signInSchema>;
