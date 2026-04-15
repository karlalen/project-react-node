import './Footer.css';

interface FooterProps {
    total: number;
    done: number;
}

function Footer({ total, done }: FooterProps) {
    const pending = total - done;
    
    return (
        <footer className="footer">
            <div className="footer-stat total">
                <span className="label"> Total Tareas</span>
                <span className="value">{total}</span>
            </div>
            <div className="footer-stat completed">
                <span className="label"> Completadas</span>
                <span className="value">{done}</span>
            </div>
        </footer>
    );
}

export default Footer;