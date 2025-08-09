import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'quicksand': ['Quicksand', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				/* Boho custom colors */
				sage: {
					DEFAULT: 'hsl(var(--sage))',
					foreground: 'hsl(var(--sage-foreground))'
				},
				terracotta: {
					DEFAULT: 'hsl(var(--terracotta))',
					foreground: 'hsl(var(--terracotta-foreground))'
				},
				cream: {
					DEFAULT: 'hsl(var(--cream))',
					foreground: 'hsl(var(--cream-foreground))'
				},
				'dusty-rose': {
					DEFAULT: 'hsl(var(--dusty-rose))',
					foreground: 'hsl(var(--dusty-rose-foreground))'
				},
				/* Kawaii Color Extensions */
				'sky-blue': 'hsl(var(--sky-blue))',
				'pastel-mint': 'hsl(var(--pastel-mint))',
				'peach-pink': 'hsl(var(--peach-pink))',
				'lavender': 'hsl(var(--lavender))',
				'cloud-white': 'hsl(var(--cloud-white))',
				'soft-gray': 'hsl(var(--soft-gray))',
				'charcoal-gray': 'hsl(var(--charcoal-gray))',
				'blush-pink': 'hsl(var(--blush-pink))',
				'soft-gold': 'hsl(var(--soft-gold))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'gentle-bounce': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'blur-in': {
					'0%': { filter: 'blur(4px)', opacity: '0' },
					'100%': { filter: 'blur(0)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.3s ease-out',
				'accordion-up': 'accordion-up 0.3s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'gentle-bounce': 'gentle-bounce 0.3s ease-out',
				'blur-in': 'blur-in 0.5s ease-out'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-sage': 'var(--gradient-sage)',
				'gradient-warm': 'var(--gradient-warm)'
			},
			boxShadow: {
				'soft': 'var(--shadow-soft)',
				'gentle': 'var(--shadow-gentle)'
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
