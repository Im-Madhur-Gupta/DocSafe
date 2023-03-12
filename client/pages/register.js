import styles from "../styles/Register.module.css";
import Link from "next/link";
import { useRouter } from "next/router";


export default function register() {
    const router = useRouter();

    function proceed(){
        router.push('/dashboard');
    }

	return (
		<div className={styles.container}>
			<div className={styles.registerBox}>
				<div className={styles.title}>Enter your Username</div>
				<input
                    className={styles.input}
                    type="text" 
                    placeholder="for example: @username"
                />
				<div className={styles.btnBox}>
					<button onClick={proceed} className={styles.proceed}>Proceed</button>
					<div className={styles.back}>
						<Link href="/">Go back</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
