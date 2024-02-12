import secrets


def generate_secret_or_key():
    return secrets.token_hex(32)


print(generate_secret_or_key())
