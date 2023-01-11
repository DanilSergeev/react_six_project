
export default function FadeFotos({ name, imgs }) {
    return (
        <div className="contentIMG">
            {
                imgs.map((foto, index) =>
                    <img alt={index} key={index + 1} src={foto} />
                )
            }
            <h6>{name}</h6>
        </div>
    )
}