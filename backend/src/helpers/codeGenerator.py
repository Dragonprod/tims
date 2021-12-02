import random
import string


def create_activation_code():
    left = ''.join(random.SystemRandom().choice(
        string.ascii_uppercase + string.ascii_lowercase) for _ in range(5))
    right = ''.join(random.SystemRandom().choice(string.digits)
                    for _ in range(5))
    return f"{left}{right}"
