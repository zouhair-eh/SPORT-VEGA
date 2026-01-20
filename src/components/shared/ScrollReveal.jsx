import { motion } from 'framer-motion';

export default function ScrollReveal({ children, direction = 'up', delay = 0, className = '' }) {
    const directions = {
        up: { y: 50, x: 0 },
        left: { x: -50, y: 0 },
        right: { x: 50, y: 0 },
        none: { x: 0, y: 0 }
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
