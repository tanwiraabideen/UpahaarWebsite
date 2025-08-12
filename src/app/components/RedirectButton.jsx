'use client'

export default function RedirectButton() {
    return (
        <button onClick={() => window.open('https://www.dkms.org/register-now', '_blank')} className="btn btn-lg btn-success rounded-full">Register as a Stem Cell Donor</button>
    )
}