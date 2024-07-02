
export const fileUpload = async( file ) => {
    if( !file ) throw new Error('File is required');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dlv6h6w0j/upload';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'react-journal');

    try{
        const res = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });
        
        if( !res.ok ) throw new Error('No se pudo subir la imagen al servidor');

        const cloudResponse = await res.json();    
        return cloudResponse.secure_url;

    } catch(error){
        throw new Error( error.message )
    } 

}