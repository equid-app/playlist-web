import Header from "./header";

export default function DefaultLayot(props: any) {
    return (
        <div>
            <Header />
            {props.children}
        </div>
    );
}