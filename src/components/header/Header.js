

export default function Header() {
    const styles = {
        header: {
            display: "flex",
            alignItems: "center",
            height: "100%"
        },
        welcomeText: {
            marginLeft: "auto",
            textAlign: "right"
        }
    }
    return (
        <div style={styles.header}>
            <div style={styles.welcomeText}>Welcome Satish Kumar</div>
        </div>
    );
}
