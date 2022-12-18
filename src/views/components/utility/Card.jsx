export default function Card(props) {
    const { title = '' } = props;

    return (
        <>
            <div className="card">
                <h5 className="card-header">{title}</h5>
                <div className="card-body">
                    {props.children}
                </div>
            </div>
        </>
    )

}